import UsersList from "@/components/admin/users/users-list";

export default function UsersListPage() {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/4">
          <h1>Users</h1>
        </div>
      </div>
      <UsersList />
    </>
  );
}
