import axios from 'axios';
function Router() {
    return {
        ///////////////////////////////////////////////////////////////
        /////////////////////gertDAta////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        post: async function(data) {
            let form = data.form !== null ? new FormData(data.form) : new FormData()

            console.log(form.entries(),"rtyuio")    
            if (typeof data.appends !== 'undefined') {
                data.appends.forEach((a, i) => {
                    form.append('post' + i, a)
                })
            }
            for(var pair of form.entries()) {
                console.log(pair[0]+', '+pair[1],'enryy');
              }

            var option  = {
                //method: 'POST',
               // mode: 'cors',
                headers: { "Content-type": "application/json" },
                //body: form
            }
            //var request = new Request(data.url, option);

           return axios.post(data.url,{d:"tyui"},option)
            // .then(d=>{
            //     console.log(d)
            // }).catch(r=>{
            //     console.log(r,"rt")
            // })
       
           // } catch (e) {


               // return { bol: false, res: { err: "Network refuse connection", e: e } };


            //}



        }, ///////////////////////////////////////////////////////////////
        /////////////////////gertDAta////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        get: async function(data) {

            var request = new Request(data.url, {
                method: 'get',
                mode: 'cors',
                headers: { "Accept": "application/json" },

            });


            try {
                const fetchResult = fetch(request)
                const response = await fetchResult;
                if (response.status >= 200 && response.status <= 299) {
                    const jsonData = await response.json();
                    return { bol: true, res: jsonData }
                } else {
                    setTimeout(() => {
                        document.querySelector(".err").innerHTML = `
                   <h2>Network refuse connection to  ${data.url} 
                   <br> 
                    ${'status code: '+response.status}
                    ${'why: Document '+response.statusText}
                    <br>
                    ${'can not access '+response.url}

                    </h2>`

                    }, 200)
                    console.log(response.status, response.statusText);
                }



            } catch (e) {

                setTimeout(() => {
                    document.querySelector(".err").innerHTML = `<h2>Network refuse connection to ${data.url}</h2>`

                }, 3000)

                return { bol: false, res: { err: "Network refuse connection", e: e } };


            }



        }, ///////////////////////////////////////////////////////////////



    } ////////////////End of object return///////////////
    //////////////////////////////




}


export default Router;

