"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CreditCard, Truck } from "lucide-react";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/mocks/mock-data";

const TIMELINE_STEPS = ["confirmed", "processing", "shipped", "delivered"] as const;

function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIdx = TIMELINE_STEPS.indexOf(currentStatus as typeof TIMELINE_STEPS[number]);
  if (currentStatus === "cancelled") {
    return (
      <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-300">
        This order was cancelled.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {TIMELINE_STEPS.map((step, i) => {
        const isCompleted = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
              >
                {i + 1}
              </div>
              <span className={`text-xs capitalize ${isCompleted ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {step}
              </span>
            </div>
            {i < TIMELINE_STEPS.length - 1 && (
              <div className={`h-0.5 w-8 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const order = mockOrders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-4 text-lg font-medium text-foreground">Order not found</p>
        <Button onClick={() => router.push("/dashboard/orders")}>Back to Orders</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Order #{order.id}</h1>
          <p className="text-sm text-muted-foreground">
            Placed on {new Date(order.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Order Status</h3>
        <OrderTimeline currentStatus={order.status} />
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground">Items ({order.items.length})</h3>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item, i) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 px-5 py-3"
            >
              <div className="h-12 w-12 rounded-lg bg-muted" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{item.productName}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Shipping Address</h3>
          </div>
          <p className="text-sm text-foreground">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{order.shippingAddress.address}</p>
          {order.shippingAddress.apartment && <p className="text-xs text-muted-foreground">{order.shippingAddress.apartment}</p>}
          <p className="text-xs text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Payment</h3>
          </div>
          <p className="text-sm text-foreground">{order.paymentMethod}</p>
          {order.trackingNumber && (
            <div className="mt-3 flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Tracking: {order.trackingNumber}</span>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Order Summary</h3>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${order.subtotal.toFixed(2)}</span></div>
          {order.discount > 0 && <div className="flex justify-between"><span className="text-emerald-600">Discount</span><span className="text-emerald-600">-${order.discount.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-foreground">${order.tax.toFixed(2)}</span></div>
          <hr className="border-border" />
          <div className="flex justify-between text-base font-bold"><span className="text-foreground">Total</span><span className="text-primary">${order.total.toFixed(2)}</span></div>
        </div>
      </div>

      {order.status === "confirmed" || order.status === "processing" ? (
        <Button variant="outline" size="default" className="text-destructive border-destructive hover:bg-destructive/10">
          Cancel Order
        </Button>
      ) : null}
    </div>
  );
}
