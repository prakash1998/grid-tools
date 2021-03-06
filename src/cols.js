import moment from 'moment'
import R from 'ramda'
import { extractData } from './utils'
const defaultProps = {
  editable: true,
  isKey: false,
  alignment: 'center',
  width: 100,
  sortable: true,
  showInRowEditor: true,
}

// numearls display is here
export const numCol = (
  { ident, display, displayFormat = '0.00', ...rest } = {
    displayFormat: '0.00',
  }
) => ({
  ident,
  display: display || ident,
  type: 'num',
  displayFormat,
  ...defaultProps,
  ...rest,
})

export const intCol = props => ({
  ...numCol(props),
  displayFormat: '0',
})

export const dollarCol = props => ({
  ...numCol(props),
  displayFormat: '$0,0.00',
})

export const pctCol = props => ({
  ...numCol(props),
  displayFormat: '0.00%',
})

export const strCol = ({ ident, display, ...rest } = {}) => ({
  ident,
  display: display || ident,
  type: 'str',
  ...defaultProps,
  ...rest,
})

export const boolCol = ({ ident, display, ...rest } = {}) => ({
  ident,
  display: display || ident,
  type: 'bool',
  ...defaultProps,
  ...rest,
})

export const yesNoCol = ({ ident, display, ...rest } = {}) => ({
  ident,
  display: display || ident,
  type: 'bool',
  ...defaultProps,
  ...rest,
})

// eslint-disable-next-line standard/object-curly-even-spacing
const dateProps = ({ /* ident, */ dataFormat, displayFormat }) => ({
  sortIndexGetter: ({ rowData, header }) => {
    const data = extractData({ rowData, header, dataFormat })
    return R.isNil(data)
      ? undefined
      : moment.isDate(data) || moment.isMoment(data)
      ? data.valueOf()
      : moment(data, dataFormat).valueOf()
  },
  dataFormat,
  displayFormat,
})

export const dateCol = ({
  ident,
  display,
  dataFormat = 'YYYY-MM-DD',
  displayFormat = 'MM/DD/YYYY',
  ...rest
} = {}) => ({
  ident,
  display: display || ident,
  type: 'date-time',
  ...dateProps({ ident, dataFormat, displayFormat }),
  ...defaultProps,
  ...rest,
})

export const dateTimeCol = ({
  ident,
  display,
  dataFormat = 'YYYY-MM-DD[T]HH:mm:ss',
  displayFormat = 'MM/DD/YYYY HH:mm:ss',
  ...rest
} = {}) => ({
  ident,
  display: display || ident,
  type: 'date-time',
  ...dateProps({ ident, dataFormat, displayFormat }),
  ...defaultProps,
  ...rest,
})

export const tStampCol = ({
  ident,
  display,
  dataFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSSZ',
  displayFormat = 'MM/DD/YYYY HH:mm:ss.SSSZ',
  ...rest
} = {}) => ({
  ident,
  display: display || ident,
  type: 'date-time',
  ...dateProps({ ident, dataFormat, displayFormat }),
  ...defaultProps,
  ...rest,
})
