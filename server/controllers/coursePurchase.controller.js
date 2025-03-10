import paypalClient from "../config/paypalClient.js";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import paypal from "@paypal/checkout-server-sdk";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const coursePriceINR = course.coursePrice; // ✅ INR amount (No USD conversion)

    // Convert INR to USD for PayPal processing
    const conversionRate = 0.012; // Example rate (₹1 = $0.012)
    const coursePriceUSD = (coursePriceINR * conversionRate).toFixed(2);

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: coursePriceUSD, // PayPal requires USD
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: coursePriceUSD,
              },
            },
          },
          description: course.courseTitle,
          items: [
            {
              name: course.courseTitle,
              unit_amount: {
                currency_code: "USD",
                value: coursePriceUSD,
              },
              quantity: 1,
              category: "DIGITAL_GOODS",
              images: [course.courseThumbnail],
            },
          ],
        },
      ],
      application_context: {
        return_url: `http://localhost:5173/course-progress/${courseId}`,
        cancel_url: `http://localhost:5173/course-details/${courseId}`,
      },
    });

    const order = await paypalClient.execute(request);
    if (!order || !order.result) {
      return res.status(400).json({ message: "PayPal order creation failed" });
    }

    // ✅ Save purchase record with only amountINR
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amountINR: coursePriceINR, // ✅ Store only INR
      status: "pending",
      paymentId: order.result.id,
    });

    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: order.result.links.find((link) => link.rel === "approve").href,
      amountINR: `₹${coursePriceINR}`, // ✅ Display INR price on frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * PayPal Webhook to Handle Payment Confirmation
 */
export const paypalWebhook = async (req, res) => {
  try {
    const event = req.body;
    if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
      const orderId = event.resource.id;

      const purchase = await CoursePurchase.findOne({
        paymentId: orderId,
      }).populate("courseId");
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      purchase.status = "completed";

      // Make all lectures visible
      if (purchase.courseId && purchase.courseId.lectures?.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );
    }

    res.status(200).send();
  } catch (error) {
    console.error("Error handling PayPal webhook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get Course Details with Purchase Status
 */
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get All Purchased Courses
 */
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourses) {
      return res.status(404).json({ purchasedCourses: [] });
    }

    return res.status(200).json({
      purchasedCourses,
    });
  } catch (error) {
    console.log(error);
  }
};
