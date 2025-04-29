"use client"

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const LIMITE_DE_TOASTS = 1
const TEMPO_DE_REMOCAO_DO_TOAST = 1000000

type ToastInterno = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const tiposDeAcao = {
  ADICIONAR_TOAST: "ADD_TOAST",
  ATUALIZAR_TOAST: "UPDATE_TOAST",
  DESCARTAR_TOAST: "DISMISS_TOAST",
  REMOVER_TOAST: "REMOVE_TOAST",
} as const

let contador = 0

function gerarId() {
  contador = (contador + 1) % Number.MAX_SAFE_INTEGER
  return contador.toString()
}

type TiposDeAcao = typeof tiposDeAcao

type Acao =
    | {
  type: TiposDeAcao["ADICIONAR_TOAST"]
  toast: ToastInterno
}
    | {
  type: TiposDeAcao["ATUALIZAR_TOAST"]
  toast: Partial<ToastInterno>
}
    | {
  type: TiposDeAcao["DESCARTAR_TOAST"]
  toastId?: ToastInterno["id"]
}
    | {
  type: TiposDeAcao["REMOVER_TOAST"]
  toastId?: ToastInterno["id"]
}

interface Estado {
  toasts: ToastInterno[]
}

const timeoutsDosToasts = new Map<string, ReturnType<typeof setTimeout>>()

const adicionarNaFilaDeRemocao = (toastId: string) => {
  if (timeoutsDosToasts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    timeoutsDosToasts.delete(toastId)
    despachar({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TEMPO_DE_REMOCAO_DO_TOAST)

  timeoutsDosToasts.set(toastId, timeout)
}

export const reducer = (estado: Estado, acao: Acao): Estado => {
  switch (acao.type) {
    case "ADD_TOAST":
      return {
        ...estado,
        toasts: [acao.toast, ...estado.toasts].slice(0, LIMITE_DE_TOASTS),
      }

    case "UPDATE_TOAST":
      return {
        ...estado,
        toasts: estado.toasts.map((t) =>
            t.id === acao.toast.id ? { ...t, ...acao.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = acao

      if (toastId) {
        adicionarNaFilaDeRemocao(toastId)
      } else {
        estado.toasts.forEach((toast) => {
          adicionarNaFilaDeRemocao(toast.id)
        })
      }

      return {
        ...estado,
        toasts: estado.toasts.map((t) =>
            t.id === toastId || toastId === undefined
                ? { ...t, open: false }
                : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (acao.toastId === undefined) {
        return {
          ...estado,
          toasts: [],
        }
      }
      return {
        ...estado,
        toasts: estado.toasts.filter((t) => t.id !== acao.toastId),
      }
  }
}

const ouvintes: Array<(estado: Estado) => void> = []

let estadoNaMemoria: Estado = { toasts: [] }

function despachar(acao: Acao) {
  estadoNaMemoria = reducer(estadoNaMemoria, acao)
  ouvintes.forEach((ouvinte) => {
    ouvinte(estadoNaMemoria)
  })
}

type Toast = Omit<ToastInterno, "id">

function toast({ ...props }: Toast) {
  const id = gerarId()

  const atualizar = (props: ToastInterno) =>
      despachar({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      })

  const descartar = () => despachar({ type: "DISMISS_TOAST", toastId: id })

  despachar({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) descartar()
      },
    },
  })

  return {
    id,
    dismiss: descartar,
    update: atualizar,
  }
}

function useToast() {
  const [estado, setEstado] = React.useState<Estado>(estadoNaMemoria)

  React.useEffect(() => {
    ouvintes.push(setEstado)
    return () => {
      const indice = ouvintes.indexOf(setEstado)
      if (indice > -1) {
        ouvintes.splice(indice, 1)
      }
    }
  }, [estado])

  return {
    ...estado,
    toast,
    dismiss: (toastId?: string) => despachar({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
