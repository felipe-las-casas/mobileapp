import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { Dashboard } from '../pages/Dashboard'
import { ListExpenses } from '../pages/ListExpenses'
import { Search } from '../pages/Search'
import { CodeAmount } from '../pages/CodeAmount'

type AppRoutes = {
  create: undefined;
  listAll: undefined;
  search: undefined;
  listTotal: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen
        name='create'
        component={Dashboard}
      />

      <Screen
        name='listAll'
        component={ListExpenses}
      />

      <Screen
        name='search'
        component={Search}
      />
      <Screen
        name='listTotal'
        component={CodeAmount}
      />

    </Navigator>
  )
}