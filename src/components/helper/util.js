export const customSort = (a, b) => {
    // betStatus 1 should come before betStatus 2
    const betStatusOrder = { 1: 0, 0: 1, 2: 2 };
    const aStatus = betStatusOrder[a?.betStatus] || 0;
    const bStatus = betStatusOrder[b?.betStatus] || 0;
    return aStatus - bStatus;
  }