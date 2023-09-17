export default (size: string) => {
    switch(size){
        case 'small':
            return {
                text: 'small',
                short: 'S',
                multiplier: 1
            }
        case 'medium':
            return {
                text: 'medium',
                short: 'M',
                multiplier: 1.5
            }
        case 'large':
            return {
                text: 'large',
                short: 'L',
                multiplier: 2
            }
        default: 
            return {
                text: 'small',
                short: 'S',
                multiplier: 1
            }
    }
}