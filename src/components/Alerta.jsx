
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600':
        'from-green-400 to-green-600'} bg-gradient-to-r 
        text-center py-3 font-bold rounded-xl uppercase text-sm text-white`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta