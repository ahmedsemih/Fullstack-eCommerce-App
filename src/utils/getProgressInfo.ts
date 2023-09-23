export default (progress: number, status: boolean) => {
    if(progress === 0 && status === false)
    return 'Unpaid';

    if(status === false)
    return 'Canceled'

    switch(progress){
        case 0:
            return 'Preparing';
        case 1:
            return 'On Way';
        case 2:
            return 'Delivered';
        default:
            return 'Preparing';
    }
}