export const getAllEvents = async () =>{
  let response
  try{
    response = await fetch('https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/events')
  } catch (e){
    console.log(e.response.status)
    response = e.response
  }
  return await response.json()
}