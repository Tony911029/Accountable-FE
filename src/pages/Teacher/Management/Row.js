import AddPersonIcon from 'src/components/Icon/Badge'

const Row = ({ params }) => {
  const rowInfo = params.row
  return (
    <div className='classroom-row'>
      <div className='classname-width'>{rowInfo.name}</div>
      {/* todo: this probably include teachers too which is not what we want */}
      <div>{rowInfo.number}</div>
      <div>
        <AddPersonIcon classInfo={params.row} />
      </div>
    </div>
  )
}

export default Row
