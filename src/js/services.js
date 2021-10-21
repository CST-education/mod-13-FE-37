import axios from 'axios'
import Handlebars from 'handlebars/runtime'
Handlebars.registerHelper('tempC', function (value) {
  return (value - 273.15).toFixed(1)
})
import weatherTemplate from '../templates/weatherWidget.handlebars'

export function getWeatherData(city, place) {
  // https://openweathermap.org/api
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather`
  const apiKey = `b17a2dddb01d7481fea6373f92c2e546`
  let url = baseUrl + `?q=${city}&appid=${apiKey}`
  if (!city.trim()) alert(`Enter the City`)

  axios
    .get(url)
    .then(result => result.data)
    .then(data => insertWidget(weatherTemplate, data, place))
    .catch(err => console.log(err))
}

function insertWidget(template, data, place) {
  place.classList.remove('loading')
  place.insertAdjacentHTML('afterbegin', template(data))
}

export class APIpexel {
  constructor() {
    this.API_KEY = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`
    this.BASE_URL = `https://api.pexels.com/v1`
    this.endPoint = `/search`
    this._page = 1
    this._query = ''
  }
  get query() {
    return this._query
  }
  set query(value) {
    return (this._query = value)
  }

  get page() {
    return this._page
  }
  set page(value) {
    return (this._page += value)
  }
  resetPage() {
    this._page = 1
  }

  getFetch(place) {
    axios.defaults.headers.common.Authorization = this.API_KEY
    let params = `?query=${this._query}&per_page=5&page=${this._page}`
    let url = this.BASE_URL + this.endPoint + params
    console.log('что идет в запрос: ', this._page, this._query)
    axios
      .get(url)
      //   .then(r => r.data.photos)
      .then(r => {
        return r.data.photos
      })
      .then(d => {
        // console.log(d)
        let m = this.createMUimages(d)
        place.insertAdjacentHTML('beforeend', m)
        console.log(document.documentElement)

        // делаем скролл вниз не мгновенно, с задержкой
        setTimeout(
          () =>
            window.scrollTo({
              // прокрутку делаем на всю высоту html вниз
              top: document.documentElement.offsetHeight,
              behavior: 'smooth',
            }),
          500,
        )
      })
      .catch(err => console.log(err))
  }
  createMUimages(data) {
    return data
      .map(elem => {
        //   console.log(elem) // src.original, src.tiny photographer
        const {
          photographer,
          src: { tiny, original },
        } = elem
        return `
              <li>
                <img src="${tiny}" data-src="${original}" alt="${photographer}" />
              </li>
              `
      })
      .join('')
  }
}

