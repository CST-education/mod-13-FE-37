import axios from 'axios'
import Handlebars from 'handlebars/runtime'
Handlebars.registerHelper('tempC', function (value) {
  console.log(value)
  return (value - 273.15).toFixed(1)
})
import refs from './refs'
import weatherTemplate from '../templates/weatherWidget.handlebars'

export async function getWeatherData(city, place) {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather`
  const apiKey = `b17a2dddb01d7481fea6373f92c2e546`
  let url = baseUrl + `?q=${city}&appid=${apiKey}`
  if (!city.trim()) alert(`Enter the City`)
  try {
    const r = await axios.get(url)
    console.log(r)
    const data = r.data
    console.log('getWeaterData:', data)
    insertWidget(weatherTemplate, data, place)
  } catch (err) {
    console.log('getWeatherData', err)
  }
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

  async getFetch(place) {
    axios.defaults.headers.common.Authorization = this.API_KEY
    let params = `?query=${this._query}&per_page=5&page=${this._page}`
    let url = this.BASE_URL + this.endPoint + params
    console.log('что идет в запрос: ', this._page, this._query)
    try {
      const response = await axios.get(url)
      console.log('getFetch', response)
      const photos = response.data.photos
      if (photos.length === 0) throw new Error('No match found')
      place.insertAdjacentHTML('beforeend', this.createMUimages(photos))
      setTimeout(
        () =>
          window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
          }),
        500,
      )
    } catch (err) {
      console.log('try catch block:', err)
    }
  }

  //   //   =======
  //   try {
  //       // все, что с await и просто данные
  //   } catch(err) {
  //     //   обрабатываем ошибки
  //   }
  //   // =======
  createMUimages(data) {
    return data
      .map(elem => {
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
// const api = new APIpexel()
// api.query = `cars`
// api.getFetch(refs.list)
