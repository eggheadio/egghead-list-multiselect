import PropTypes from 'prop-types'

const Maybe = ({children, condition}) => (condition ? children : null)

Maybe.propTypes = {
  children: PropTypes.node.isRequired,
  condition: PropTypes.bool.isRequired,
}

export default Maybe
