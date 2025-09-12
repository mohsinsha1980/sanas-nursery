import SubscriptionList from "@/components/admin/subscribe/subscribe-list";

export default function Subscribe() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
        <h1>Subscribe</h1>
      </div>
      <SubscriptionList/>
    </>
  );
}
