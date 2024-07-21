const rateLimit =(wiMs,msxHits,overallwiMs,overallmaxHits)=>{
    const reqTimestamp = new Map();

    return (req,res,next)=>{
        const {customer_name}=req.body;

        //Providing a check if customer_name is not present
        if(!customer_name){
            return res.status(400).json({message:'Customer name is required'})
        }

        const curr = Date.now();
        const windowstart = curr - wiMs;
        const overallwindowstart = curr - overallwiMs
        if(reqTimestamp.has(customer_name)){
            //First 
            const timeStamps = reqTimestamp.get(customer_name);
            const widHits = timeStamps.filter(timeStamp=>timeStamp>=windowstart)
            const ovHits =  timeStamps.filter(timeStamp=>timeStamp>=overallwindowstart)
            if(widHits.length>=msxHits){
                return res.status(429).json({message:'Max Limit exceeded'});
            }
            if(ovHits.length>=overallmaxHits){
                return res.status(429).json({message:'Overall max limit exceeded'})             
            }
            reqTimestamp.set(customer_name,[...widHits,curr])
        }
        else{
            reqTimestamp.set(customer_name,[curr])
        }
        next();
    }
}
module.exports=rateLimit(2*60*100,1,5*60*1000,2)