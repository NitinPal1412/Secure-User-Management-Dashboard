import { useEffect, useState } from "react";
import { initialUserState } from "../common-utils/commonUtils";
import { useUserContext } from "../custom-hooks";

export const DashBoard = () => {
  const context = useUserContext();
  const [userList , setUserList] = useState([]);
  const userName = context?.userContext?.userDetails?.email;

  const getUserName = () => {
    if (userName?.includes("@")) {
      return userName.split("@")?.[0];
    }
    return userName;
  };

  useEffect(()=> {
    getUserList();
  }, [])

  const getUserList = async() => {
    const data = await fetch("https://reqres.in/api/users?page=2")
    const list  = await data.json();
    setUserList(list?.data || []);
  }

  const handleLogout = () => {
    context?.setUserContext(initialUserState);
    localStorage.clear();
  };

  const singleCard = (item: any) => {
    return (
      <div key={item?.id} className="w-3/12 h-100 border border-gray-700 m-2 flex flex-col justify-center items-center hover:shadow-2xl transition duration-200 bg-white">
        <div className="bg-white p-4">
          <h3 className="text-xl font-semibold mb-2">{item?.first_name}</h3>
        </div>
        <div className="bg-white p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">{item?.email}</h3>
          <img src={item?.avatar} alt={item?.id}/>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen">
      <nav className=" p-4 bg-blue-500">
        <div className="container mx-auto flex justify-between items-center">
          {/* <div className="text-white font-bold text-xl">Logo</div> */}
          <p className="text-white text-xl">Welcome, {getUserName()}!</p>
          <div className="space-x-4">
            <button
              className="text-lg font-bold text-white border-2 border-white py-2 px-4 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="content flex justify-evenly flex-wrap">
        {userList?.map(item => singleCard(item))}
      </div>
    </div>
  );
};
