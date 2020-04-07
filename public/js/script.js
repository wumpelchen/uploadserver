const btn = document.querySelector('.btn');
const aFile = document.getElementById('aFile');
const progressBarBg = document.querySelector('.progress-bar-bg')
const progressBarTXT = document.querySelector('.progress-bar-txt')
const fileList = document.querySelector('.filelist')


aFile.addEventListener('change', e=>{
    btn.disabled = false;
});

btn.addEventListener('click', e =>{

    fileList.innerHTML = ''

    for(let i=0; i< aFile.files.length; i++){

        let Status = ''
        let myForm = new FormData();
        myForm.append('aFile', aFile.files[i])

        let URL = window.location.href + 'upload'
        console.log(URL)

        const config = {
            onUploadProgress: progressEvent => {

                var prozent = Math.round(progressEvent.loaded * 100)/ progressEvent.total
                
                progressBarBg.style.width = prozent.toFixed(2) + '%'
                progressBarTXT.innerHTML = prozent.toFixed(2) + '%'

                //console.log(prozent.toFixed(0))
            }
        }

        //axios.get('https://reqres.in/api/users?page=2')
        axios.post(URL, myForm, config)
        .then(res=>{
            console.log(res)
            Status = res.statusText
        })
        .catch(err =>{
            console.error(err)
            Status = 'FEHLER'
        })
        .finally(()=>{
            var li = document.createElement('p')
            li.innerHTML = ' Upload ' + Status + ' für: ' + aFile.files[i].name 

            fileList.appendChild(li)
        })
    }
});