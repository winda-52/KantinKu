import tkinter as tk
import math


root = tk.Tk()
root.title("Grafika Komputer")
root.geometry("900x650")


canvas = tk.Canvas(
    root,
    width=800,
    height=450,
    bg="white"
)
canvas.pack(pady=15)



titik_pertama = None


algoritma = "DDA"



def brute_force(x1, y1, x2, y2):

    
    if x1 == x2:

        for y in range(min(y1, y2), max(y1, y2) + 1):
            canvas.create_rectangle(
                x1, y, x1 + 1, y + 1,
                fill="blue"
            )

        return

    
    m = (y2 - y1) / (x2 - x1)
    b = y1 - m * x1

    
    for x in range(min(x1, x2), max(x1, x2) + 1):
        y = round(m * x + b)

        canvas.create_rectangle(
            x, y, x + 1, y + 1,
            fill="blue"
        )



def dda(x1, y1, x2, y2):

    dx = x2 - x1
    dy = y2 - y1

    
    steps = max(abs(dx), abs(dy))

    
    x_inc = dx / steps
    y_inc = dy / steps

    x = x1
    y = y1

    
    for i in range(steps + 1):

        canvas.create_rectangle(
            round(x),
            round(y),
            round(x) + 1,
            round(y) + 1,
            fill="blue"
        )

        x += x_inc
        y += y_inc



def bresenham(x1, y1, x2, y2):

    dx = abs(x2 - x1)
    dy = abs(y2 - y1)

    sx = 1 if x1 < x2 else -1
    sy = 1 if y1 < y2 else -1

    error = dx - dy

    while True:

        canvas.create_rectangle(
            x1, y1,
            x1 + 1, y1 + 1,
            fill="blue"
        )

        
        if x1 == x2 and y1 == y2:
            break

        e = 2 * error

        if e > -dy:
            error -= dy
            x1 += sx

        if e < dx:
            error += dx
            y1 += sy



def lingkaran(xc, yc, radius):

    
    for x in range(
        xc - radius,
        xc + radius + 1
    ):

        
        nilai = radius ** 2 - (x - xc) ** 2

        if nilai >= 0:

            y = round(math.sqrt(nilai))

            
            canvas.create_rectangle(
                x, yc + y,
                x + 1, yc + y + 1,
                fill="red"
            )

            
            canvas.create_rectangle(
                x, yc - y,
                x + 1, yc - y + 1,
                fill="red"
            )



def klik(event):

    global titik_pertama

    x = event.x
    y = event.y

    
    if titik_pertama is None:

        titik_pertama = (x, y)

        canvas.create_oval(
            x - 4, y - 4,
            x + 4, y + 4,
            fill="red"
        )

        label.config(
            text=f"Titik pertama: ({x}, {y})"
        )

    
    else:

        x1, y1 = titik_pertama
        x2, y2 = x, y

        if algoritma == "Brute Force":
            brute_force(x1, y1, x2, y2)

        elif algoritma == "DDA":
            dda(x1, y1, x2, y2)

        elif algoritma == "Bresenham":
            bresenham(x1, y1, x2, y2)

        elif algoritma == "Lingkaran":

            
            radius = round(
                math.sqrt(
                    (x2 - x1) ** 2 +
                    (y2 - y1) ** 2
                )
            )

            lingkaran(
                x1,
                y1,
                radius
            )

        label.config(
            text=f"Algoritma: {algoritma}"
        )

        
        titik_pertama = None



def pilih(nama):

    global algoritma
    global titik_pertama

    algoritma = nama
    titik_pertama = None

    label.config(
        text=f"Algoritma dipilih: {nama}. "
             f"Silakan klik titik pertama."
    )



def reset():

    global titik_pertama

    canvas.delete("all")

    titik_pertama = None

    label.config(
        text="Canvas dibersihkan."
    )



canvas.bind("<Button-1>", klik)



frame = tk.Frame(root)
frame.pack()


tk.Button(
    frame,
    text="Brute Force",
    width=15,
    command=lambda: pilih("Brute Force")
).grid(row=0, column=0, padx=5)


tk.Button(
    frame,
    text="DDA",
    width=15,
    command=lambda: pilih("DDA")
).grid(row=0, column=1, padx=5)


tk.Button(
    frame,
    text="Bresenham",
    width=15,
    command=lambda: pilih("Bresenham")
).grid(row=0, column=2, padx=5)


tk.Button(
    frame,
    text="Lingkaran",
    width=15,
    command=lambda: pilih("Lingkaran")
).grid(row=0, column=3, padx=5)


tk.Button(
    frame,
    text="Reset",
    width=15,
    command=reset
).grid(row=0, column=4, padx=5)



label = tk.Label(
    root,
    text="Pilih algoritma, kemudian klik dua titik.",
    font=("Arial", 12)
)

label.pack(pady=15)



root.mainloop()