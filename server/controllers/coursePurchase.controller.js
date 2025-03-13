import paypalClient from "../config/paypalClient.js";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import paypal from "@paypal/checkout-server-sdk";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    // ✅ Fetch the course details
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const coursePriceINR = course.coursePrice;

    // ✅ Validate course price
    if (!coursePriceINR || coursePriceINR <= 0) {
      return res.status(400).json({ message: "Invalid course price" });
    }

    // ✅ Convert INR to USD
    const conversionRate = 0.012; // Example rate (₹1 = $0.012)
    let coursePriceUSD = Number((coursePriceINR * conversionRate).toFixed(2));

    // ✅ Ensure PayPal amount is at least $0.01
    if (coursePriceUSD < 0.01) {
      coursePriceUSD = 0.01;
    }

    // ✅ Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: coursePriceUSD.toFixed(2), // ✅ Ensure it's a string
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: coursePriceUSD.toFixed(2),
              },
            },
          },
          description: course.courseTitle,
          items: [
            {
              name: course.courseTitle,
              unit_amount: {
                currency_code: "USD",
                value: coursePriceUSD.toFixed(2),
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

    // ✅ Save purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amountINR: coursePriceINR, // ✅ Store INR price
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
    console.error("Error creating PayPal checkout session:", error);
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
