import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Profile from "@/components/Profile/Profile";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const UserProfilePage = () => {
  return (

    <DefaultLayout>
    <Breadcrumb pageName="Profile" />

    <div className="flex flex-col gap-10">
      <Profile/>
    </div>
  </DefaultLayout>
  );
};

export default UserProfilePage;
