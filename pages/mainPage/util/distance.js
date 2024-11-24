export default getDistance = (point1, point2) =>{
    const deltaX = point2.longitude - point1.longitude;
    const deltaY = point2.latitude - point1.latitude;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);

}