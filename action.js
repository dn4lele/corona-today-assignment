import express from "express";
const router =express.Router();
import fetch from "node-fetch";






router.get("/coronatoday",async(req,res)=>{
    const responseFromServer = await fetch(
        `https://api.covidtracking.com/v1/states/daily.json`,
        {method:'get'}
        );
    const formatdata = await responseFromServer.json();

    //by death
    const filteredData = formatdata.filter(entry => entry.death != null);//remove all the states with no death
    const sortedData = filteredData.sort((a, b) => b.death - a.death);//sort them by death

    const uniqueStates = [];
    const stateSet = new Set();

    for (const obj of sortedData) {
        if (!stateSet.has(obj.state)) {
            stateSet.add(obj.state);
            uniqueStates.push(obj);
        }
    }


    let firstTen = uniqueStates.slice(0, 10);

    const newData = firstTen.map(item => ({date:item.date , state: item.state ,death: item.death  }));


    //same thing but with posivite
    const filteredPositiveData = formatdata.filter(entry => entry.positive != null); // remove all the states with no positive cases
    const sortedPositiveData = filteredPositiveData.sort((a, b) => b.positive - a.positive); // sort them by positive cases

    const uniquePositiveStates = [];
    const positiveStateSet = new Set();

    for (const obj of sortedPositiveData) {
    if (!positiveStateSet.has(obj.state)) {
        positiveStateSet.add(obj.state);
        uniquePositiveStates.push(obj);
    }
    }

    let firstTenPositiveStates = uniquePositiveStates.slice(0, 10);

    const newPositiveData = firstTenPositiveStates.map(item => ({ date:item.date , state: item.state, positive: item.positive}));

    
    //return messege
      return res.status(200).json({
        by_death:newData,
        by_positive:newPositiveData
    })



})
      
   




export default router;