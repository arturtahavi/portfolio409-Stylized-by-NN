function changeheading() {

    a = document.getElementById("heading").innerHTML

    if (a == "Hello!") {
    document.getElementById("heading").innerHTML = 'Nice to meet you!'
    }
    else {document.getElementById("heading").innerHTML = 'Hello!'
    }

}

