function gettowork(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let holiday = true;
            if(!holiday){
                resolve('get to the work')
            }
            else{
                reject('today is holiday')
            }
            
        },2000);
    })
}
function gotogym(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('go to gym');
        },2000)
    });
}
function getsleep(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('go to sleep');
        }, 2000);
    });
}

async function dailyhabit(){
    try{
        let work = await gettowork();
    console.log(work);
    let gym=await gotogym();
    console.log(gym);
    let sleep = await getsleep();
    console.log(sleep);
    }
    catch(error){
        console.log(error);
    }

    
}
dailyhabit();


