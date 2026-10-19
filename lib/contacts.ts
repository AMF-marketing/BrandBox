export const contacts={
 email:'brandboxy@mail.ru',
 phone:'+79682299090',
 phoneLabel:'+7 (968) 229-90-90',
 address:'г. Новосибирск, ул. Ипподромская 31, кв. 179',
 streetAddress:'ул. Ипподромская 31, кв. 179',
 mapQuery:'Новосибирск, улица Ипподромская, 31',
 hours:{weekdays:'Пн-Пт: 09:00-17:00',weekend:'Сб-Вс: выходной'}
};
// Building centroid verified against 2GIS: https://2gis.ru/novosibirsk/geo/141373143519130
// Yandex map URLs use longitude,latitude.
export const mapCoordinates='82.941191,55.043059';
export const mapLink='https://yandex.ru/maps/?ll='+mapCoordinates+'&z=17&pt='+mapCoordinates+',pm2rdm';
export const mapEmbed='https://yandex.ru/map-widget/v1/?ll='+mapCoordinates+'&z=17&pt='+mapCoordinates+',pm2rdm&l=map&lang=ru_RU';
