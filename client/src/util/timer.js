
export default async function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
