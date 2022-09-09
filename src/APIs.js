// import { AddModerator } from '@mui/icons-material';
// import  {Amplify, API } from 'aws-amplify';



// Amplify.configure({
//   Auth: {
//     region: "us-east-1",
//     userPoolId: "us-east-1_ABKrOn9rb",
//     userPoolWebClientId: "6viomjjgj7i8geglovesskj6s3",
//   },
// })
//     API: {
//       endpoints: [
//         {
//           name: "events",
//           endpoint: `https://p7uexf3z1k.execute-api.us-east-1.amazonaws.com/dev/events`,
//           custom_header: async () => {
//             return {Authorization : `Bearer ${Amplify.Auth.user.signInUserSession.accessToken.jwtToken}`}
//           }
//         },
//         {
//           name: "events-types",
//           endpoint: `https://p7uexf3z1k.execute-api.us-east-1.amazonaws.com/dev/events`,
//           custom_header: async () => {
//             return {Authorization : `Bearer ${Amplify.Auth.user.signInUserSession.accessToken.jwtToken}`}
//           }
//         }
//       ]
//     }
//   }
// );



// export const getAllEvents = async () =>{
//   let response
//   try{
//     response = await API.get('events')
//   } catch (e){
//     console.log(e.response.status)
//     response = e.response
//   }
//   return await response.json()
// }

// export const postEvent = async (id) => {
//   let response
//   try{
//     response = await API.post(`events',${id}`)
//   } catch (e){
//     console.log(e.response.status)
//     response = e.response
//   }
// }