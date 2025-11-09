// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   let params = useParams();
// //   const getUsers = async () => {
// //     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/`);
// //     const data = await res.json();
// //     setUsers(data);
// //   };
// const getUsers = () => {
//     fetch('https://jsonplaceholder.typicode.com/users/5/')
//     .then((res) => res.json())
//     .then((data)=>console.log(data))
// }
//   useEffect(() => {
//     getUsers()
//   },[]);

//   return (
//     <div>
//       {/* {users.length===0?<button onClick={getUsers}>Get User</button>
//       :users.map((user) => {
//         return <h1 key={user.id}>{user.name}</h1>;
//       })} */}
//       <h1>{users.name}</h1>
//     </div>
//   );
// };

// export default Users;
