import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { useTheme, AVAILABLE_THEMES } from '../../contexts/ThemeContext'
import { SwatchIcon } from '@heroicons/react/24/outline'

export default function ThemeCustomizer() {
  const { t } = useTranslation()
  const { currentTheme, setThemeColor } = useTheme()

  return (
    <Popover className="relative">
      <Popover.Button
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative">
          <SwatchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div className={`absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-${currentTheme}-500`} />
        </div>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setThemeColor(theme.name)}
                  className={`w-7 h-7 rounded-full bg-${theme.name}-500 ring-offset-2 transition-shadow hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-500 ${
                    currentTheme === theme.name ? 'ring-2 ring-gray-400 dark:ring-gray-500' : ''
                  }`}
                  title={t(`theme.colors.${theme.name}`)}
                />
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
