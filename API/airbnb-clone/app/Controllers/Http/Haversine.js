
function degToRad(deg) {
  const pi = Math.PI
  return deg * (pi / 180)
}

function calcHaverSine(LA_A, LO_A) {
  const haverside = (6371 * (Math.acos(
    (Math.cos(90 - degToRad(LA_A))
      *
      Math.cos(90 - degToRad(-8.05250)))
    +
    (Math.sin(90 - degToRad(LA_A))
      *
      Math.sin(90 - degToRad(-8.05250)))
    *
    (Math.cos(degToRad(LO_A) - degToRad(-34.87888))))
  ))

  return console.log(haverside)
}
calcHaverSine(-6.870051, -38.55908)

module.exports = calcHaverSine()

