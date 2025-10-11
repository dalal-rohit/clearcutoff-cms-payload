// import { Endpoint } from 'payload';
// import { BigQuery } from '@google-cloud/bigquery';

// const bigquery = new BigQuery();

// const fetchCourses: Endpoint = {
//   path: '/fetch/course',
//   method: 'get',
//   handler: async (req, res, next, { payload }) => {
//     try {
//       const [rows] = await bigquery.query({
//         query: `SELECT courseId, title, description FROM \`your-project.dataset.courses\` LIMIT 50`,
//       });

//       for (const row of rows) {
//         await payload.update({
//           collection: 'courses',
//           where: { courseId: { equals: row.courseId } },
//           data: { title: row.title, description: row.description },
//         }).catch(async () => {
//           await payload.create({
//             collection: 'courses',
//             data: row,
//           });
//         });
//       }

//       res.json({ status: 'success', inserted: rows.length });
//     } catch (err) {
//       res.status(500).json({ status: 'error', message: err.message });
//     }
//   },
// };

// export default fetchCourses;
