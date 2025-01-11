import DAODashboardLayout from "../../../layout/DAOdashboardLayout";
import Head from "./components/Head";
import PTable from "./components/PTable";

const Proposals = () => {
  return (
    <DAODashboardLayout>
      <Head />
      <PTable />
    </DAODashboardLayout>
  );
};

export default Proposals;
// // // 
// import { useState, useEffect } from "react";
// import useContentDAO from "../../../hooks/useDAO";
// type Proposal = {
//   id: number;
//   name: string;
//   description: string;
//   duration: number;
//   status: string;
// };
// const ProposalsTable = () => {
//   const { getProposals } = useContentDAO();
//   const [proposals, setProposals] = useState<Proposal[]>([]);

//   useEffect(() => {
//     getProposals().then((proposals) => {
//       if (Array.isArray(proposals)) {
//         setProposals(proposals);
//       } else {
//         console.error("Error: proposals is not an array");
//       }
//     });
//   }, [getProposals]);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Description</th>
//           <th>Duration</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {proposals.map((proposal) => (
//           <tr key={proposal.id}>
//             <td>{proposal.id}</td>
//             <td>{proposal.name}</td>
//             <td>{proposal.description}</td>
//             <td>{proposal.duration}</td>
//             <td>{proposal.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ProposalsTable;