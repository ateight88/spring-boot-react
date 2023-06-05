// import React from 'react';

// import UserDetails from './UserDetails';

// const UserList = props => {
//   if (props.items.length === 0) {
//     return (
//       <div className='center'>
//         <h2>No users found.</h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <ul className='users-list'>
//         {props.items.map(user =>
//           user.items.length > 0 ? (
//             <UserDetails
//               key={user.id}
//               id={user.id}
//               name={user.name}
//               articles={user.articles.length}
//               createdAt={user.createdAt}
//               modifiedAt={user.modifiedAt}
//             />
//           ) : null
//         )}
//       </ul>
//     </>
//   );
// };
// export default UserList;
