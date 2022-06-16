import { get } from "./axios";

export const getImages = async () => { 
  const list = [];
  for (let i = 0; i < 10; i++) { 
    let item = `https://picsum.photos/300/300?random=${i}`;
    list.push(item);
  }
  return new Promise((resolve) => { 
    setTimeout(() => { 
      resolve(list);
    }, 2000);
  });
}