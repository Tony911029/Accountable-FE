import { CircularProgress } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Button } from '@material-ui/core'

const useStyles = makeStyles()((theme, { disabled }) => ({
  mainButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 20px',
    whiteSpace: 'pre',
    boxShadow: ' 0px 2px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    '&:hover': {
      boxShadow: '0px 10px 30.5px 0px #FF99004A'
    },
    background: disabled ? '#D3D3D3 !important' : '#FF9900 !important', // Conditional background color
    backgroundColor: disabled ? '#D3D3D3' : '#FF9900',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '800 !important',
    color: '#fff !important'
  },
  testButton: {
    // Other styles remain unchanged
    background: disabled ? '#D3D3D3 !important' : '#FF9900 !important', // Correct conditional logic and syntax
    backgroundColor: disabled ? '#D3D3D3' : '#FF9900'
    // Other styles remain unchanged
  }
}))

function MainButton({
  isLoading,
  style,
  isSaved,
  type,
  disabled = false,
  onClick,
  onMouseDown,
  btnLabel,
  id,
  isLabelCapitalize = true,
  ariaExpanded = false,
  className,
  ...props
}) {
  const { classes } = useStyles({ disabled })
  return (
    <Button
      type={type}
      style={style}
      id={id}
      onMouseDown={onMouseDown}
      disabled={disabled || isLoading}
      className={`${className} ${
        isLabelCapitalize
          ? classes.mainButton
          : `${classes.mainButton} noCapitalize`
      }`}
      onClick={onClick || (() => {})}
      aria-expanded={ariaExpanded ? 'true' : undefined}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {' '}
          <CircularProgress
            size={15}
            style={{
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          />{' '}
          Saving
        </span>
      ) : isSaved ? (
        'Saved'
      ) : (
        btnLabel
      )}
    </Button>
  )
}

export default MainButton
