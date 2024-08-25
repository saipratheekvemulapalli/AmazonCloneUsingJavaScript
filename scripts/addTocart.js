export const cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
},{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
}];

export function addtocart(productid){
    let matchingitem;
              let flag=0;
              cart.forEach((cartItem)=>{
                  if(productid===cartItem.productId){
                    matchingitem=cartItem;
                    matchingitem.quantity=+1;
                    flag=1;
                  }
              });
              if(flag===1){
                matchingitem.quantity=+1;
              }
              else{
                cart.push({
                  productid:productid,
                   quantity:1
                 })
              }
  }