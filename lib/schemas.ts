import { z } from "zod";

export const cakeCustomizerSchema = z.object({
  flavor: z.string().min(1, "Please select a flavor"),
  weight: z.string().min(1, "Please select a weight"),
  shape: z.string().min(1, "Please select a shape"),
  sponge: z.string().min(1, "Please select a sponge type"),
  cream: z.string().min(1, "Please select a cream type"),
  filling: z.string().min(1, "Please select a filling"),
  decoration: z.string().min(1, "Please select a decoration"),
  colorTheme: z.string().min(1, "Please select a color theme"),
  cakeTopper: z.string().min(1, "Please select a cake topper"),
  referenceImage: z.string().optional(),
  cakeMessage: z.string().max(100, "Message must be under 100 characters").optional(),
  deliveryDate: z.string().min(1, "Please select a delivery date"),
  deliveryTime: z.string().min(1, "Please select a delivery time"),
});

export type CakeCustomizerFormData = z.infer<typeof cakeCustomizerSchema>;

const phoneRegex = /^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
const cardNumberRegex = /^\d{16}$/;
const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cardCvcRegex = /^\d{3,4}$/;

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const minDateStr = tomorrow.toISOString().split("T")[0];

export const checkoutSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z.string().min(1, "Phone is required").regex(phoneRegex, "Invalid phone number"),
    address: z.string().min(1, "Address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(5, "ZIP code must be at least 5 characters").max(10),
    savedAddressId: z.string().optional(),
    deliveryDate: z.string().min(1, "Delivery date is required").refine(
      (val) => val >= minDateStr,
      "Date must be in the future"
    ),
    deliveryTime: z.string().min(1, "Delivery time is required"),
    orderNotes: z.string().max(500, "Notes must be under 500 characters").optional(),
    isGift: z.boolean(),
    giftMessage: z.string().max(200, "Message must be under 200 characters").optional(),
    paymentMethod: z.enum(["credit-card", "paypal", "stripe"]),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
    cardName: z.string().optional(),
    acceptedTerms: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.paymentMethod) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select a payment method", path: ["paymentMethod"] });
    }
    if (!data.acceptedTerms) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "You must accept the terms and conditions", path: ["acceptedTerms"] });
    }
    if (data.paymentMethod === "credit-card") {
      if (!data.cardNumber || !cardNumberRegex.test(data.cardNumber.replace(/\s/g, ""))) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid 16-digit card number", path: ["cardNumber"] });
      }
      if (!data.cardExpiry || !cardExpiryRegex.test(data.cardExpiry)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid expiry (MM/YY)", path: ["cardExpiry"] });
      }
      if (!data.cardCvc || !cardCvcRegex.test(data.cardCvc)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid CVC", path: ["cardCvc"] });
      }
      if (!data.cardName || data.cardName.trim().length < 1) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Cardholder name is required", path: ["cardName"] });
      }
    }
    if (data.isGift && data.giftMessage && data.giftMessage.length > 200) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Message must be under 200 characters", path: ["giftMessage"] });
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
