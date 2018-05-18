let array = [1, 2, 3];

// function powerset(arr) {
  // let powerSetArr = [['blah ']]

  // for (let j = 0; j < arr.length; j++) {
  //   // console.log('*********************beginning of loop -**************************')
  //   // console.log(arr[j], 'current NUM of for of loop', powerSetArr, 'current powerSET')
  //   let length = powerSetArr.length
  //   // console.log(length, 'current length')
  //   for (let i = 0; i < length; i++) {
  //     // console.log(i, 'current i')
  //     // console.log(powerSetArr[i], 'powerSET')
  //     // console.log(num, 'num')
  //     // console.log(powerSetArr[i] + '*' + arr[j], 'what\s added to powerset' )
  //     powerSetArr.push(powerSetArr[i].concat(arr[j]))
  //     // console.log('---------------- end of loop for loop -------------')
  //   }
  // }
  // return powerSetArr

  function powerset(array, idx = null) {
    // let triplets = [[]]
    // for (const num of array) {
    // 	let length = triplets.length
    // 	for (let i = 0; i < length; i++) {
    // 		triplets.push(triplets[i].concat(num))
    // 	}
    // }
    // return triplets
    if (idx === null) {
      console.log(idx, 'line 32')
      idx = array.length - 1
      console.log(idx, 'line 34')
    }
    if (idx < 0) {
      return [[]]
    }

    let ele = array[idx]
    let subset = powerset(array, idx - 1)
    let length = subset.length

    for (let i = 0; i < length; i++) {
      subset.push(subset[i].concat(ele))
      console.log(subset, 'current subset')
    }

    return subset
  }
// }

console.log(powerset(array))
