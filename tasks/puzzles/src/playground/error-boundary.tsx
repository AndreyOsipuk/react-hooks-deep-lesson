import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

// Перехватчик ошибок рендера. В React 19 его по-прежнему можно написать только классом.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <p className="error">Компонент упал: {this.state.error.message}</p>;
    }
    return this.props.children;
  }
}
