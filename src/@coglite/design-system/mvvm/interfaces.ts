import * as React from 'react'


 interface IComponentContext {
  resolver: IViewModelResolver
}

 interface IComponentDefinition {
  view: IView<IViewModel>
  displayName?: string
  inputs?: string[]
  outputs?: string[]
}

 interface IComponentProps<TViewModel extends IViewModel>{
  model?: TViewModel
  modelRef?: (model: TViewModel) => void
}

 interface IComponentState {
  model: IViewModel
  shouldDispose: boolean
}

 type IEventListener<TEvent> = (e?: TEvent) => void

 type IEventListenerDisposer = () => void

 interface IEventEmitter<TEvent>{
    emit(e?: TEvent): void
    subscribe(listener: IEventListener<TEvent>): IEventListenerDisposer
    dispose(): void
}

 interface ILinkDisposer{
  (): void
}




/**
 * A View is basically a React component receiving a "model" prop 
 * which is a ViewModel instance.
 * Note that this component will be wrapped in order to create the actual
 * MVVM component.
 */
 interface IViewProps<TViewModel extends IViewModel>{
    model?: TViewModel
}

/**
 * A View is basically a React component receiving a "model" prop 
 * which is a ViewModel instance.
 * Note that this component will be wrapped in order to create the actual
 * MVVM component.
 */
 type IView<TViewModel extends IViewModel> = 
      React.ComponentClass<IViewProps<TViewModel>>
   |  React.StatelessComponent<IViewProps<TViewModel>>
   |  React.SFC<IViewProps<TViewModel>>
   |  React.ReactElement<IViewProps<TViewModel>>



 interface IViewModel extends Object {
      /**
       * Disposes the ViewModel, here you should cleanup listeners.
       * If created internally, any internal reference to the ViewModel
       * will be removed.
       */
      dispose?()
  }

 interface IViewModelResolver {
    (key?: any): IViewModel
}

export {IComponentContext, IComponentDefinition,IComponentProps ,IComponentState, IEventListener,IEventListenerDisposer , IEventEmitter
,ILinkDisposer , IViewProps,IView ,IViewModel , IViewModelResolver, 
}