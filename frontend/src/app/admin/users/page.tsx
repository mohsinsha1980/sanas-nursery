import UsersList from "@/components/admin/users/users-list";

export default function UsersListPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
        <h1 className="text-3xl font-bold text-gray-900 !px-0">Users</h1>
      </div>
      <UsersList />
    </>
  );
}
