let trans_l = document.getElementById("trans_l")
let trans_r = document.getElementById("trans_r")

let _left = document.getElementById('leftpage')
let _right = document.getElementById('rightpage')

let _page = document.getElementById('page')





let sign_in = document.getElementById('in')
let sign_up = document.getElementById('up')

let _error = document.getElementById('error1')
let _tbl = document.getElementById('tbl')

_error.addEventListener('click', () => {
    _error.style.opacity = '0'
    _error.style.width = '0%'
})
_tbl.addEventListener('click', () => {
    _tbl.style.opacity = '0'
    _tbl.style.left = '-100%'
})

trans_l.addEventListener('click', () => {
    _page.style.left = '50%'
    _left.style.left = '-50%'
    setTimeout(() => {
        _right.style.right = '0'
    }, 300);
})
trans_r.addEventListener('click', () => {
    _page.style.left = '0%'
    _right.style.right = '-50%'
    setTimeout(() => {
        _left.style.left = '0'
    }, 300);
})

sign_up.addEventListener('click', () => {
    let nameup = document.getElementById("name").value;
    let emailup = document.getElementById("email").value;
    let passup = document.getElementById("pass").value;

    let flag = 0;
    fetch('https://6596f49e6bb4ec36ca03a219.mockapi.io/login')
        .then(res => res.json())
        .then(para => {
            para.map((val) => {
                if ((val.email === emailup) || (val.pass='') || (val.email='') || (val.name='')) {
                    flag++
                }
            })
            if (flag == 0) {
                fetch('https://6596f49e6bb4ec36ca03a219.mockapi.io/login', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        name: nameup,
                        email: emailup,
                        pass: passup
                    })
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(task => {
                    setTimeout(() => {
                        _page.style.left = '50%'
                        _left.style.left = '-50%'
                        setTimeout(() => {
                            _right.style.right = '0'
                        }, 300);
                    }, 400);
                }).catch(error => {
                    alert('error')
                })
            } else {
                _error.style.opacity = '1'
                _error.style.width = '100%'
            }
        })
})



sign_in.addEventListener('click', () => {
    let emaili = document.getElementById('email_in').value;
    let passwordi = document.getElementById('pass_in').value;
    if (emaili == "" || passwordi == "") {
        _error.style.opacity = '1'
        _error.style.width = '100%'
    } else {

        fetch('https://6596f49e6bb4ec36ca03a219.mockapi.io/login')
            .then(res => res.json())
            .then(data => {
                if ((emaili == 'ali@gmail.com') && (passwordi='1234')) {
                    data.map((val) => {
                        let row = document.createElement('tr')
                        row.innerHTML = `
                            <td>${val.id}</td>
                            <td>${val.name}</td>
                            <td>${val.email}</td>
                            <td>${val.pass}</td>
                        `
                        _tbl.appendChild(row)
                        _tbl.style.opacity = '1'
                        _tbl.style.width = '50%'
                        _tbl.style.left = '0%'
                    })
                } else {
                    data.map((val) => {
                        if (
                            (val.email === emaili) &&
                            (val.pass === passwordi)
                        ) {
                            let row = document.createElement('tr')
                            row.innerHTML = `
                            <td>${val.id}</td>
                            <td>${val.name}</td>
                            <td>${val.email}</td>
                            <td>${val.pass}</td>
                        `
                            
                            _tbl.appendChild(row)
                            _tbl.style.opacity = '1'
                            _tbl.style.width = '70%'
                            _tbl.style.left = '0%'
                        }

                    })
                }
            })
    }

})