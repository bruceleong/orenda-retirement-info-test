import db from './config/constants'

db.collection('data')
  .doc('cafeGrumpy')
  .set({
    provider: 'transamerica',
    providerLogin: 'https://www.transamerica.com',
    planName: 'Cafe Grumpy 401k 401k Plan',
    planDescription: 'https://drive.google.com/file/d/17lT5REEVzmZPVSJrUVzyRS8rUh1KS9wt/view?usp=sharing',
    password: 1234
  })

db.collection('forms')
  .doc('cafeGrumpForms')
  .set({
    'distribution form':
      'https://drive.google.com/open?id=1AxHLkEhf5FRb1Y7link5-NOFAjvOUxnu',
    'rollover':
      'https://drive.google.com/open?id=1OZuDOe4t5CtZ22pG0mC9I3Z-4es6RChU'
  })

// db.collection('data')
//   .doc('cafeGrumpy')
//   .set({
//     provider: 'transamerica',
//     providerLogin: 'https://www.transamerica.com',
//     planName: 'Cafe Grumpy 401k 401k Plan',
//     planDescription: 'https://drive.google.com/file/d/17lT5REEVzmZPVSJrUVzyRS8rUh1KS9wt/view?usp=sharing',
//     password: 1234
//   })

// db.collection('forms')
//   .doc('cafeGrumpForms')
//   .set({
//     'distribution form':
//       'https://drive.google.com/open?id=1AxHLkEhf5FRb1Y7link5-NOFAjvOUxnu',
//     'rollover':
//       'https://drive.google.com/open?id=1OZuDOe4t5CtZ22pG0mC9I3Z-4es6RChU'
//   })
