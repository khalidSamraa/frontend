let collection

function getSudomain() {
  let host = window.location.host

  if(host === "localhost") {
    return "localhost"
  } else {
    let parts = host.split(".")
    return parts[0]
  }
}

if(getSudomain() === "localhost") {
  collection = {
    API     :"https://d-s-be.dimusco.com/",
    API_WUL :"https://d-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "localhost:3000") {
  collection = {
    API     :"https://d-s-be.dimusco.com/",
    API_WUL :"https://d-w-ul.dimusco.com/"
    // API     :"https://hendrik.s-s-be.dimusco.com/",
    // API_WUL :"https://hendrik.s-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "s-fe") {
  collection = {
    API     :"https://s-be.dimusco.com/",
    API_WUL :"https://s-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "s-s-fe") {
  collection = {
    API     :"https://d-s-be.dimusco.com/",
    API_WUL :"https://d-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "danan") {
  collection = {
    API     :"https://hendrik.s-s-be.dimusco.com/",
    API_WUL :"https://hendrik.s-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "oliver") {
  collection = {
    API     :"https://oliver.s-s-be.dimusco.com/",
    API_WUL :"https://oliver.s-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "warehouse") {
  collection = {
    API     :"https://warehouse.s-s-be.dimusco.com/",
    API_WUL :"https://warehouse.s-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "fe1") {
  collection = {
    API     :"https://p-s-be.dimusco.com/",
    API_WUL :"https://p-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "fe2") {
  collection = {
    API     :"https://p-s-be.dimusco.com/",
    API_WUL :"https://p-w-ul.dimusco.com/"
  }
} else if(getSudomain() === "p-s-fe") {
  collection = {
    API     :"https://p-s-be.dimusco.com/",
    API_WUL :"https://p-w-ul.dimusco.com/"
  }
} else {
  collection = {
    API     :"https://d-s-be.dimusco.com/",
    API_WUL :"https://d-w-ul.dimusco.com/"
  }
}

export default(collection)
