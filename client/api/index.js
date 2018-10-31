async function getInformationAboutApps(api)
{
    try{
        let response = await fetch(api);
        let responseJson = await response.json();
        return responseJson.data;
    }
    catch(error){
        console.error('Error is:'+error)
    }
}



async function checkApplication(ident){
    try
    {
        let response = await fetch(`http://localhost:3001/check/${ident}`)
        let responseJson = await response.json()
        return responseJson.data;
    }
    catch(error)
    {
        console.error('Error is '+error)
    }
}

async function sendForm(data){
    try{
        let response = await fetch('http://localhost:3001/application',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({data})
        })
        let responseJson = await response.json()
        return responseJson
    }
    catch(error)
    {
        console.error('Error is:'+error)
    }
}

async function sendApplicationAndChangeStatus(data){
    try{
        let response = await fetch('http://localhost:3001/eventapp',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({data})
        })
        let responseJson = await response.json()
        return responseJson
    }
    catch(error)
    {
        console.error('Error is:'+error)
    }
}



export {getInformationAboutApps,sendForm ,sendApplicationAndChangeStatus,checkApplication}