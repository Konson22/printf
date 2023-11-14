#include "main.h"
/**
 * print_binary - Print the binary representation of an unsigned integer.
 * @args: A va_list containing the unsigned int to be printed.
 *
 * Return: The number of binary digits printed.
 */
int print_binary(va_list args)
{
unsigned int num = va_arg(args, unsigned int);
int count = 0;
int bit_length = sizeof(unsigned int) * 8;

int i;

for (i = bit_length - 1; i >= 0; i--)
{
int bit = (num >> i) & 1;

_putchar('0' + bit);
count++;
}

return (count);
}
