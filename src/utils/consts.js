export const deviceSizes = {
    mobile: 320,
    tablet: 768,
    desktop: 1240
}
// TOOD translate

export const SUPPLY_TYPE = {name: 'feed.post.new.supply', value:'SUPPLY'};
export const DEMAND_TYPE = {name: 'feed.post.new.demand', value:'DEMAND'};

export const POST_TYPES = [
    SUPPLY_TYPE,
    DEMAND_TYPE
]

export const JOB_SUB_TYPE = {SUPPLY: 'feed.post.new.supply.job', DEMAND: 'feed.post.new.demand.job', value:'JOB'};
export const INVESTOR_SUB_TYPE = {SUPPLY: 'feed.post.new.supply.investment', DEMAND: 'feed.post.new.demand.investment', value:'INVESTOR'};
export const PARTNER_SUB_TYPE = {SUPPLY: 'feed.post.new.supply.partner', DEMAND: 'feed.post.new.demand.partner', value:'PARTNER'};

export const POST_SUB_TYPES = [
    JOB_SUB_TYPE,
    INVESTOR_SUB_TYPE,
    PARTNER_SUB_TYPE
]

export const THEME = {
    primary: '#094074',
    primaryDark: '#07335C',
    secondary: '#FFAB00',
    secondaryDark: '#CC8800',
    background: '#f5f5f5',
    backgroundDark: '#A0A0A0',
    negative: '#f44336',
    border: 'lightgray',
    colorLight: 'rgba(0,0,0,.6)'
  }