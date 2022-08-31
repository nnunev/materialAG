import React, { Component }  from 'react';
// import { GET_USER } from "../queries/userQueries";
import { useParams } from "react-router-dom";
//import { FaUser } from "react-icons/fa";

export default function User() {
  const { id } = useParams();
  //const { loading, error, data } = useQuery(GET_USER, { variables: { id } });
  // if (loading) return <p>Loading</p>;
  // if (loading) return <p>Something went wrong</p>;

  return (
    <></>
    // <>
    //   {!loading && !error && (
    //     <table>
    //       <tbody>
    //         <tr>
    //           <td>
    //             <FaUser className="card" />
    //           </td>
    //           <td>
    //             <p>{data.user.firstName}</p>
    //             <p>{data.user.lastName}</p>
    //             <p>{data.user.email}</p>
    //           </td>
    //           <td>{data.user.status}</td>
    //           <td>{data.user.usergroup}</td> 
    //         </tr>
    //       </tbody>
    //     </table> 
    //   )}
    //   <a className="btn btn-primary" href={`/`}> BACK</a>
    // </>
  );
}
