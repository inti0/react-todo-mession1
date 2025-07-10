처음 과제 제시를 받았을 때는 기본적인 기능들을 수업 복습을 통해 빠르게 구현하고 추가적인 기능 구현을 하고자 하였습니다.  

그러나, 과제를 수행하면서 수업 중 가볍게 넘어갔던 부분에 대해서 살펴보았고 또 ai와 문답하는 과정에서 hook과 같은 react의 기본에 대해  익숙해 지는 것이 react에 대한 이해와 최종 프론트엔드 과제 수행에 가장 도움이 될 것 같다고 느꼈습니다.  

이에 따라 README를 일반적인 프로그램의 기능 및 설계에 대한 상세가 아닌, 일종의 학습 레포트 형식으로 작성하게 되었습니다.

<br><br><br>

# 학습과정
## 등록기능(handleInputChnge) 비제어 컴포넌트 vs 제어 컴포넌트
간단하게 React상태(state)에 의해 관리 된다면 제어 컴포넌트,  

HTML의 DOM 자체만을 이용해 입력 필드의 값을 얻어내면 비제어 컴포넌트이다.  

(상태 추적이 일어나지 않고 DOM 요소를 직접 참조하여 값을 읽어내는 useRef또한 비제어 컴포넌트이다.)

[비제어 컴포넌트 vs 제어 컴포넌트 노션 정리](https://holistic-gerbera-6ad.notion.site/22951e653cca80738fdac6b8111db7ba?source=copy_link)

**제어 컴포넌트**
```js
const handleInputChange = (e) => {
    setInputValue(e.target.value);  // 이밴트 객체로 얻어낸 값을 useState를 통해 관리
}

<form onSubmit={handleOnSubmit}>
    <input
       value={inputValue}
       ...
    />
</form>
```

**비제어 컴포넌트**
```js
const inputValue = e.target.elements.todo.value;

<form onSubmit={handleOnSubmit}>
    <input
       name="todo"
       ...
    />
</form>
```

제어 컴포넌트는 사용자의 모든 입력이 React 상태를 거쳐가기 때문에, React가 폼의 모든 변경 사항을 인지하고 제어한다.  

따라서, 유효성 검사, 조건부 렌더링 등 복잡한 로직 구현에 유리하다.

<br><br><br>

## useRef vs useState 무엇으로 관리해야 할까?

### ID의 경우 useRef를 사용하는 것이 더 적절하다. 

ID의 값이 변경되라도 컴포넌트가 다시 렌더링 될 필요가 없으므로 useRef를 사용하는 것이 좋다.  

### Input, Form 에서는?  

7월 9일 WTL을 통해, 위의 Input을 다루는 것에 대해서도 useRef를 사용하는 것이 좋다는 피드백을 받았다.

```js
//useRef를 사용한다면?
import { useRef } from 'react';

function TodoSubmitForm({ addTodo }) {
  const inputRef = useRef(); // DOM 요소 참조

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value; // 현재 입력값 읽기
    addTodo(value);
    inputRef.current.value = ''; // 입력창 초기화
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        ref={inputRef} // input 요소를 직접 참조
      />
      ...
    </form>
  );
}

```

위의 `handleOnSubmit` (원래 코드에선 handleInputChange)의 경우 gemini를 통해 학습할 때는 useRef대신 useState를 사용하여 코드를 작성하였으나, 코드에 대해 수정을 권유 하지 않았다. WTL에서 useRef를 사용하는 것은 어떠냐고 피드백을 받았고 이에 대해 gemini에게 질문하며 학습을 시작했다.

계속해서 문답을 했지만 gemini의 경우 useState사용을 권장하여서 여러 자료를 통해 검증해보려 하였고 이를 통해 내린 결론은 다음과 같다.

 해당 TodoApp에서의 Input은 즉각적인 피드백이나 검증이 이루어지지 않으므로 `useRef`를 사용하는 것이 **성능적인 면에서 가장 옳다**고 할 수 있다. 하지만, `useState`를 사용하더라도 실제로는 성능 저하가 거의 일어나지 않는다, 일반적으로 문제없다 혹은 **이를 사용하는것이 권장된다**고 여겨지는 것 같다.
  - gpt의 경우 실제로 성능 저하의 문제가 되는 경우 React.memo, useCallback, useMemo, lazy, Suspense, 그리고 상태 관리 범위 축소 등의 고급 기법을 적용하는 것을 추천하였음.

### 참고 자료

[What is BETTER useState or useRef, when handling multiple form inputs in React?](https://stackoverflow.com/questions/76086163/what-is-better-usestate-or-useref-when-handling-multiple-form-inputs-in-react?newreg=bcdb4a27d3b4486191c9694f0680b324)

[🅰️ Top 6 React Hook Mistakes Beginners Make](https://youtu.be/GGo3MVBFr1A?si=_5oDEIFm1qFKWT7j&t=39) (위의 stackoverflow질문 글에서 언급된 '상태가 필요하지 않으면 state를 사용하는 것은 실수이다' 라고 하는 영상)


🅱️ 한편 해당 질문 글에 대해 React는 가상DOM을 통한 리렌더링 최적화가 이루어지므로 useState를 사용하여도 괜찮다고 하는 한 stackoverflow 사용자의 답변

<details>
<summary> 답변 내용 </summary>  

> I haven't watched the video, but if the author suggests to use useRef() instead of state to save performance, he doesn't seem to have much clue of how React actually works.

> React only applies changes to the DOM when it spots the changes in the virtual DOM, which is the representation of the nodes used to keep track of necessary changes. If your state change causes many DOM updates, it means that you do it wrong, most likely recreate a state value unnecessarily. The easiest way to this mistake is to recreate object in state, instead of memoizing it.

> Using states means achieving much cleaner and reusable React code. Use useRef() only when you need to perform an action on a DOM element (like focus()) or when you need a value that needs to be accessed in the same cycle and/or is not rendered.
</details>  
<br>

[🅱️ React 공식 문서에서도 Form 처리를 useState의 사용례로 제시한다.](https://react.dev/reference/react/useState#updating-objects-and-arrays-in-state)


[🅱️ useRef VS useState GPT를 이용한 정리](https://chatgpt.com/share/686e9a11-9228-8006-89a1-ead96ce157d0)
<details>
<summary> 문답 내용 정리 </summary>  

❓ useState 대신 useRef가 더 좋은 경우는?
답: 입력값을 렌더링에 반영할 필요가 없다면 useRef가 더 간단하고 효율적임 (ex. 로그인 폼).
  
❓ useState로 매번 리렌더링해도 성능 문제가 없다는 게 사실인가?
답: 그렇다. React는 Virtual DOM 덕분에 변경된 부분만 최소한으로 실제 DOM에 반영해서 성능 부담이 거의 없음.

❓ "최소한"이란 뭘 의미함? 입력 중에도 실제 DOM은 안 바뀌는 건가?
답: 아님. 입력 중에도 실제 DOM은 업데이트됨. 단, 바뀐 부분만 반영됨 (input.value만).

❓ 입력폼 제출할 때만 리렌더링 되는 거 아님?
답: ❌ 아니고, 입력할 때마다 상태 변경 → 리렌더링 발생함. 단, React가 자동으로 최적화함.

❓ 이건 배열 vs ArrayList 성능 비교랑 비슷한가?
답: ✅ 정확함. 배열이 더 빠를 수 있지만, 실용성과 편의성 때문에 ArrayList 자주 쓰는 것과 같은 맥락.
</details>

<br><br><br>

## toggleTodo에는 onClick대신 onChnage를 사용해야하는 이유 

`toggleTodo` 구현 중 `onClick`사용시 나타나는 경고문
```
You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
```
`removeTodo`처럼 단순히 **클릭 되었을 때 특정 동작이 수행되는 경우** `onClick`이 사용된다.

`toggleTodo`와 같이 **입력 요소의 '값' 또는 '상태'가 변경되는 경우** `onChange`핸들러를 제공해야만 React가 다시 렌더링할 수 있게 된다. 즉, 경고문에서와 같이 onChange 핸들러가 제공되지 않을 경우 읽기 전용이되어 내부 값의 변경이 React 상태(State)에 업데이트되지 않는다.

<br><br><br>

## localStorage와 Js의 window 객체

JavaScript에서 window 객체는 브라우저 환경에서 실행되는 모든 클라이언트 측 JavaScript 코드의 **가장 최상위 전역 객체(Global Object)**
 - document, console 등이 window객체이며 window.을 생략하고 사용 가능하다.
 - 마찬가지로 localStorage또한 window 객체이고 `setItem`, `getItem`메소드를 사용할 수 있다.

<br><br><br>

## id의 useEffect의 초기화방식

```js
export function useTodoManager(storageKey, defaultTodos) {
    const idRecorder = useRef(findMaxId(defaultTodos) + 1);
    const [todos, setTodos] = useLocalStorage(storageKey, defaultTodos);
    useEffect(() => {
        idRecorder.current = findMaxId(todos + 1); // idRecorder.current++;와의 비교
    }, [todos]);
```

단순히 DB의 id처럼 생각하여 `idRecorder.current++`를 고려하였는데, gemini는 `localSotrage`와의 동기화 문제, 개발자 도구로 localStorage의 접근 등으로 인하여 findMax()를 이용하여 초기화하는 방식을 권장하였다.

또한, 처음 idRecorder가 잘 초기화 되기만 하면 되는거 아닌가 싶어서 이 부분의 useEffect의 사용에 대해서도 회의적이었는데, 견고성과 ID값을 적당한 값으로 유지하는 것, 생명주기 동기화를 보장하기 위해 사용을 권장하였다.  

계속해서 납득이 어려워서 시간을 계속 썼는데 아래의 답변을 보고 납득하게 되었다.


<details>
<summary> 앱 초기 로드 시 idRecorder의 정확한 초기화 문제</summary>  

```JavaScript
export function useTodoManager(storageKey, defaultTodos) {
    const [todos, setTodos] = useLocalStorage(storageKey, defaultTodos); // (A)
    const idRecorder = useRef(findMaxId(todos) + 1); // (B)
    // ...
}
```
위 코드에서 (A)와 (B)는 모두 todos 값을 사용합니다. 하지만 React의 렌더링 생명주기상, (B)가 실행될 때의 todos 값과, (A)가 localStorage에서 데이터를 완전히 불러와 확정된 후의 todos 값은 다를 수 있습니다.

특히 useLocalStorage와 같은 커스텀 훅은 내부적으로 useState의 지연 초기화 함수를 사용하거나, useEffect를 통해 비동기적으로 localStorage에서 값을 불러올 수 있습니다. 이 말은 첫 렌더링 시점에 todos가 defaultTodos로 먼저 설정되었다가, localStorage 데이터가 로드된 후 한 번 더 업데이트될 수 있다는 의미입니다.

만약 idRecorder = useRef(findMaxId(todos) + 1);처럼 useRef의 초기값에 todos를 직접 사용하면, 이 useRef는 **가장 처음 렌더링될 때의 todos 값(아직 localStorage 데이터가 반영되지 않은 defaultTodos일 수 있는 값)** 만을 가지고 idRecorder.current를 초기화하게 됩니다. 이후 todos가 localStorage의 진짜 값으로 업데이트되어도, useRef는 다시는 초기화되지 않습니다. (왜냐하면 useRef는 첫 렌더링 시 딱 한 번만 실행되기 때문입니다.)

</details>
