export const cart=[];

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